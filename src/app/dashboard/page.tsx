'use client'
import { useSession } from "next-auth/react";

const DashBoard = () => {
    const { status, data: session } = useSession();
    return ( 
        <div>
            DashBoard
        </div>
     );
}
 
export default DashBoard;