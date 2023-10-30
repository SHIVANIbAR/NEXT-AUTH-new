import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async()=> {
    const session= await getServerSession(authOptions);
    if(session?.user){
return<h2 className="text-2xl">adminpage-welcome back{session?.user.username}</h2>
    }
    console.log(session);
    
    return <h1 className="text-2xl">please login to see this dmin page</h1>;
  };
  export default page;
  