import { ModeToggle } from "../toggle";
import Menu from "./menu/Menu";

export function Navbar() {
    return (
        <div className="grid grid-cols-12 gap-4 border-y border-gray-500 p-2 ">
            <div className="grid col-span-2 items-center justify-center">
                <ModeToggle></ModeToggle>
            </div>
            <div className="col-span-3 col-start-5">
               <Menu/> 
            </div>
        </div>
    )
}