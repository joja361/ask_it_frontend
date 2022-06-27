import ResponseItem from "./ResponseItem";

export default function ResponseList({ responses, likes }) {
  const responsesLength = responses.length;

  return (
    <>
      <hr />
      <h6 className="response-header">{responsesLength} Responses</h6>
      {responses.map((responseData, index) => {
        const { email, name, response, id, created_at } = responseData;
        const borderBottom = index !== responsesLength - 1 && "border-bottom";

        const responseLikesOrDislikes = likes.filter(
          (like) => like.response_id === +id
        );

        return (
          <div className={`pt-3 ${borderBottom}`} key={id}>
            <ResponseItem
              email={email}
              name={name}
              response={response}
              id={id}
              created={created_at}
              likes={responseLikesOrDislikes}
            />
          </div>
        );
      })}
    </>
  );
}
