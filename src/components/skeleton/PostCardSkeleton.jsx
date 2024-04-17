export default function PostCardSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row items-center border rounded-tl-lg rounded-br-lg mb-4 w-full word-break: break-all"  >
            <div className="my-4 mx-4">
                <div className="animate-pulse" >
                    <div class=" bg-slate-700 h-10 w-10"></div>
                </div>
            </div>
            <div className="w-full">
                <div className="lg:mt-4 ml-4">
                    <div className="animate-pulse">
                        <div className="font-bold text-lg bg-slate-700 h-4 w-16"></div>
                    </div>
                </div>
                <div className="w-fit mb-4 mt-1 mx-4 overflow-auto ">
                    <div className="animate-pulse">
                        <div className="text-lg bg-slate-700 h-4 w-60"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}