interface ImageBlockProps {
  src: string;
  caption: string;
  height: string;
  width: string;
  alignment: string;
}

function ImageBlock(props: ImageBlockProps) {
  let alignment =
    props.alignment === "none"
      ? "center"
      : props.alignment === "left"
      ? "flex-start"
      : "flex-end";

  return (
    <>
      <img
        style={{
          alignSelf: alignment,
          height: props.height,
          width: props.width,
          maxWidth: "70%",
        }}
        alt={props.caption}
        src={props.src}
      />
      <p style={{ color: "grey", alignSelf: "center", fontFamily: "Inter" }}>
        {props.caption}
      </p>
    </>
  );
}

export default ImageBlock;
