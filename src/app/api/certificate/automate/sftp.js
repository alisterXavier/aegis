import { execFile } from 'child_process';
import { NextResponse } from 'next/server';

const fs = require('fs');
const { Client } = require('ssh2');

// SSL Certificates needs to be written
// All others needs to be uploaded/replaced

const locations = (domain) => {
  return {
    'ubtunu/debian/kali': {
      apache: {
        cert_folder: '/etc/ssl/certs/',
        domain_folder: `/etc/apache2/sites-available/${domain}.conf`,
        ssl_config_folder: `/etc/apache2/sites-available/${domain}-le-ssl.conf`,
        commands: [
          'a2dissite 000-deafult.conf',
          `a2ensite ${domain}.conf`,
          `a2ensite ${domain}-le-ssl.conf`,
          'a2enmod ssl',
          'systemctl restart apache2',
        ],
      },
    },
    'centos/redhat': {
      apache: {
        cert_folder: '/etc/ssl/certs/',
        domain_folder: '/etc/httpd/conf/httpd.conf',
        ssl_config_folder: '/etc/httpd/conf.d/ssl.conf',
        commands: [
          'yum install mod_ssl',
          'sudo systemctl restart httpd.service',
        ],
      },
    },
    suse: {
      apache: {
        cert_folder: `/etc/letsencrypt/live/${domain}`,
        domain_folder: '/etc/sysconfig/apache2',
        commands: ['sudo systemctl restart apache2'],
      },
    },
  };
};

const getTemplates = (domain, os) => {
  const domainTemplateFilePath = `templates/${os}/domain.conf`;
  const domainTemplate = fs.readFile(
    domainTemplateFilePath,
    'utf8',
    (err, data) => {
      if (err) {
        console.error('Error reading template file:', err);
        return;
      }

      const modifiedData = data.replace(/<DOMAIN_NAME>/g, domain);
      return modifiedData;
    }
  );

  const sslTemplateFilePath = `templates/${os}/ssl.conf`;
  const sslTemplate = fs.readFile(sslTemplateFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading template file:', err);
      return;
    }

    const modifiedData = data.replace(/<DOMAIN_NAME>/g, domain);
    return modifiedData;
  });

  return { domainTemplate: `${domainTemplate}`, sslTemplate: `${sslTemplate}` };
};

const ssh = (host, username, password) => {
  var conn = new Client();
  conn.connect({
    host: host,
    port: 22,
    username: username,
    password: password,
  });

  const uploadFile = (local, remote) => {
    conn.on('ready', function () {
      conn.sftp(function (err, sftp) {
        if (err) throw err;

        var readStream = fs.createReadStream(local);
        var writeStream = sftp.createWriteStream(remote);
        writeStream.on('close', () => {
          console.log('- Uploaded files succesfully');
          conn.end();
        });

        writeStream.on('end', () => {
          console.log('sftp connection closed');
          conn.end();
        });

        readStream.pipe(writeStream);
      });
    });
  };

  const newFile = (append, remote) => {
    conn.on('ready', function () {
      conn.sftp(function (err, sftp) {
        if (err) throw err;

        sftp.writeFile(remote, append, (err) => {
          if (err) throw err;
        });
      });
    });
  };

  const execCommand = (command) => {
    conn.on('ready', function () {
      conn.exec(command, (err, stream) => {
        if (err) return err;
        stream
          .on('close', () => {
            console.log('Stream :: close');
            conn.end();
          })
          .on('data', (data) => {
            console.log('OUTPUT: ' + data);
          });
        stream.end('ls -l\nexit\n');
      });
    });
  };

  return { uploadFile, execCommand, newFile };
};

export const SSH2connection = async (
  host,
  username,
  password,
  os,
  web_server,
  domain
) => {
  let domainFolderPath, SSLCertificateFolderPath, SSLFolderPath, commands;
  const sshClient = ssh(host, username, password);
  const file_path = locations(domain);
  const templates = getTemplates(domain, os);
  if (web_server === 'apache') {
    if (os === 'suse') {
      domainFolderPath = file_path.suse.apache.domain_folder;
      SSLCertificateFolderPath = file_path.suse.apache.cert_folder;
      commands = file_path.suse.apache.commands;
      NextResponse.json({ status: 200 });
    }

    if (os == 'ubuntu-debian-kali') {
      domainFolderPath = file_path['ubtunu/debian/kali'].apache.domain_folder;
      SSLCertificateFolderPath =
        file_path['ubtunu/debian/kali'].apache.cert_folder;
      SSLFolderPath = file_path['ubtunu/debian/kali'].apache.ssl_config_folder;
      commands = file_path['ubtunu/debian/kali'].apache.commands;
    }

    if (os === 'redhat-centos') {
      domainFolderPath = file_path['centos/redhat'].apache.domain_folder;
      SSLCertificateFolderPath = file_path['centos/redhat'].apache.cert_folder;
      SSLFolderPath = file_path['centos/redhat'].apache.ssl_config_folder;
      commands = file_path['centos/redhat'].apache.commands;
    }
  }

  const upload = () => {
    console.log('Upload');
  };

  const newFile = () => {
    sshClient.newFile(templates.domainTemplate, domainFolderPath);
    sshClient.newFile(templates.sslTemplate, SSLFolderPath);
  };

  const execCommands = () => {
    console.log('Executing');
  };

  return {
    execCommands,
    newFile,
    upload,
  };
};
