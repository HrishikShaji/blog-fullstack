import Link from "next/link";
import Image from "next/image";

export const Comments = () => {
  const status = "authenticated";
  return (
    <div className="flex flex-col gap-10">
      <h1>Comments</h1>
      {status === "authenticated" ? (
        <div className="flex gap-2">
          <textarea />
          <button>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Image
              className="h-10 w-10 rounded-full"
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
              alt="image"
              height={1000}
              width={1000}
            />
            <div>
              <span>John doe</span>
              <span>10.3.2023</span>
            </div>
          </div>
          <div>
            <p>
              diam ut venenatis tellus in metus. Magna ac placerat vestibulum
              lectus mauris ultrices. Augue interdum velit euismod in
              pellentesque massa. Aliquet eget sit amet tellus cras adipiscing
              enim eu turpis. Viverra suspendisse potenti nullam ac tortor vitae
              purus faucibus.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Image
              className="h-10 w-10 rounded-full"
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
              alt="image"
              height={1000}
              width={1000}
            />
            <div>
              <span>John doe</span>
              <span>10.3.2023</span>
            </div>
          </div>
          <div>
            <p>
              diam ut venenatis tellus in metus. Magna ac placerat vestibulum
              lectus mauris ultrices. Augue interdum velit euismod in
              pellentesque massa. Aliquet eget sit amet tellus cras adipiscing
              enim eu turpis. Viverra suspendisse potenti nullam ac tortor vitae
              purus faucibus.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Image
              className="h-10 w-10 rounded-full"
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400"
              alt="image"
              height={1000}
              width={1000}
            />
            <div>
              <span>John doe</span>
              <span>10.3.2023</span>
            </div>
          </div>
          <div>
            <p>
              diam ut venenatis tellus in metus. Magna ac placerat vestibulum
              lectus mauris ultrices. Augue interdum velit euismod in
              pellentesque massa. Aliquet eget sit amet tellus cras adipiscing
              enim eu turpis. Viverra suspendisse potenti nullam ac tortor vitae
              purus faucibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
