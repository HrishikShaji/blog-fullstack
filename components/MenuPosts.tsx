import Link from "next/link";
import Image from "next/image";

interface MenuPostsProps {
  heading: string;
}

export const MenuPosts: React.FC<MenuPostsProps> = ({ heading }) => {
  return (
    <div>
      <h1 className="text-3xl">{heading}</h1>
      <div className="">
        <Link className="flex gap-1" href="/">
          <Image
            className="w-20 h-20 object-cover"
            height={1000}
            width={1000}
            alt="image"
            src="https://images.pexels.com/photos/16776159/pexels-photo-16776159/free-photo-of-water-around-rocks-on-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div>
            <span>Travel</span>

            <h3>just some line</h3>
            <div>
              <span>John doe</span>
              <span>10.2.2023</span>
            </div>
          </div>
        </Link>
        <Link className="flex gap-1" href="/">
          <Image
            className="w-20 h-20 object-cover"
            height={1000}
            width={1000}
            alt="image"
            src="https://images.pexels.com/photos/16776159/pexels-photo-16776159/free-photo-of-water-around-rocks-on-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div>
            <span>Travel</span>

            <h3>just some line</h3>
            <div>
              <span>John doe</span>
              <span>10.2.2023</span>
            </div>
          </div>
        </Link>
        <Link className="flex gap-1" href="/">
          <Image
            className="w-20 h-20 object-cover"
            height={1000}
            width={1000}
            alt="image"
            src="https://images.pexels.com/photos/16776159/pexels-photo-16776159/free-photo-of-water-around-rocks-on-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div>
            <span>Travel</span>

            <h3>just some line</h3>
            <div>
              <span>John doe</span>
              <span>10.2.2023</span>
            </div>
          </div>
        </Link>
        <Link className="flex gap-1" href="/">
          <Image
            className="w-20 h-20 object-cover"
            height={1000}
            width={1000}
            alt="image"
            src="https://images.pexels.com/photos/16776159/pexels-photo-16776159/free-photo-of-water-around-rocks-on-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div>
            <span>Travel</span>

            <h3>just some line</h3>
            <div>
              <span>John doe</span>
              <span>10.2.2023</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
