import styled from "styled-components";

function Post({
  title,
  complete,
  totalMember,
  presentMember,
  tag,
  type,
  writer,
}) {
  return (
    <PostLayout>
      <p>{{ complete } === "Y" ? `모집완료` : `모집중`}</p>
      <h1>{title}</h1>
      <p>
        {presentMember}/{totalMember}
      </p>
      {/* {tag.map((value) => ( */}
      <button>{tag}</button>
      {/*}  ))}*/}
      <hr />
      <p>{writer}</p>
    </PostLayout>
  );
}

const PostLayout = styled.div`
  clear: both;
  width: 200px;
  height: 300px;
  border: 3px solid #385493;
  border-radius: 20px;
  float: right;
`;

export default Post;
