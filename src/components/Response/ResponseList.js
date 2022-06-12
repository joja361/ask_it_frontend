export default function ResponseList({ responses }) {
  return (
    <>
      {responses.map((responseData) => {
        const { email, name, response, id, created_at } = responseData;
        return (
          <div key={id} className="border-bottom">
            {response}
          </div>
        );
      })}
    </>
  );
}
