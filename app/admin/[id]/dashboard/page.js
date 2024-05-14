import { getData } from "./action/action";


const Page = async () => {
    const article= await getData("article");

    console.log(article)
 
    return (
        <div className="container mx-auto py-10 ">
            <p>Page admin</p>
        </div>
    );
};

export default Page;
