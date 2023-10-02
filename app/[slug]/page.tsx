import { Menu } from "@/components/Menu";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <div className="flex items-center gap-[50px]">
        <div className="flex-1 relative flex flex-col gap-10">
          <h1 className="text-3xl">Just a heading</h1>
          <div className="flex items-center gap-[20px]">
            <Image
              className="h-20 w-20 rounded-full object-cover"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
              height={1000}
              width={1000}
              alt="image"
            />
            <div className="relative h-[50px] w-[50px]">
              <span>John doe</span>
              <span>10.3.2023</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Image
            className="relative h-[350px]"
            src="https://images.pexels.com/photos/18427797/pexels-photo-18427797/free-photo-of-light-sea-dawn-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            height={1000}
            width={1000}
            alt="image"
          />
        </div>
      </div>
      <div className="flex gap-[50px]">
        <div className="flex-[5]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            tortor pretium viverra suspendisse potenti. Et netus et malesuada
            fames ac turpis. Lacus vel facilisis volutpat est velit egestas dui
            id ornare. Praesent elementum facilisis leo vel fringilla est
            ullamcorper eget nulla. Facilisis leo vel fringilla est ullamcorper.
            Arcu dictum varius duis at consectetur lorem donec massa. Arcu felis
            bibendum ut tristique et egestas quis. Dui accumsan sit amet nulla
            facilisi. Tristique senectus et netus et malesuada fames ac. Nulla
            at volutpat diam ut venenatis tellus in metus. Magna ac placerat
            vestibulum lectus mauris ultrices. Augue interdum velit euismod in
            pellentesque massa. Aliquet eget sit amet tellus cras adipiscing
            enim eu turpis. Viverra suspendisse potenti nullam ac tortor vitae
            purus faucibus.
          </p>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Page;
