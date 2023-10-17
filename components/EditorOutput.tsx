import dynamic from "next/dynamic";
import Image from "next/image";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  },
);

interface EditorProps {
  content: any;
}

const style = {
  paragraph: {
    fontsize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const renderers = {
  image: CustonImageRenderer,
  code: CustomCodeRenderer,
};

export const EditorOutput: React.FC<EditorProps> = ({ content }) => {
  return (
    <Output
      style={style}
      data={content}
      className="text-sm"
      renderers={renderers}
    />
  );
};

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

function CustonImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}
