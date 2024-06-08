'use client';
import { useEffect, useRef, useState } from 'react';
import { Certificate } from '../../../../types/next-auth';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { axios } from '../axios';

type GlobeType = {
  certs: Certificate[];
};

export const Globe = ({ certs }: GlobeType) => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [locations, setLocations] = useState<any[]>([]);

  const getEarth = async () => {
    const res: any = await d3.json('/geo/earth.json');
    const countries = feature(res, res.objects.countries);
    const div = document.querySelector('.globe');
    const { clientWidth, clientHeight } = div as Element;

    const projection = d3
      .geoOrthographic()
      .scale(100)
      .translate([clientWidth / 2, clientHeight / 2]);
    const pathGen = d3.geoPath().projection(projection);

    const svg = d3
      .select(svgRef.current)
      .attr('width', clientWidth)
      .attr('height', clientHeight);

    svg
      .selectAll('path')
      .data((countries as any).features)
      .enter()
      .append('path')
      .attr('d', (d) => pathGen(d as any))
      .attr('class', 'country');

    return { svg, projection, pathGen, markerGroup: svg.append('g') };
  };

  const getInformation = async () => {
    const data = new Set(certs.map((i) => i.dns.identifier.value));
    const coordinates = [];

    // for (const domain of data) {
    // Correct loop
    try {
      const res = await axios.get(`http://ip-api.com/json/google.com`); // Correct URL
      coordinates.push({ lat: res.data.lat, lon: res.data.lon });
    } catch (error) {
      console.log(error);
    }
    // }

    setLocations(coordinates);
  };

  useEffect(() => {
    if (!isLoaded) {
      setLoaded(true);
      getInformation();
    } else {
      getEarth().then(({ svg, projection, pathGen, markerGroup }) => {
        d3.timer((elapsed) => {
          projection.rotate([elapsed * 0.02, -30, 0]);
          svg.selectAll('path.country').attr('d', (d) => pathGen(d as any));

          markerGroup
            .selectAll('circle')
            .data(locations)
            .join('circle')
            .attr('cx', (d) => {
              const prObj = projection([d.lon, d.lat]);
              if (prObj) {
                return prObj[0];
              } else {
                return 0;
              }
            })
            .attr('cy', (d) => {
              const prObj = projection([d.lon, d.lat]);
              if (prObj) {
                return prObj[1];
              } else {
                return 0;
              }
            })
            .attr('r', 5)
            .attr('stroke', 'var(--dpurple)')
            .attr('fill', 'var(--bg)');
        });
      });
    }
  }, [isLoaded, certs, locations]);

  return (
    <div className="globe" style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} />
    </div>
  );
};
