import { Col, Row } from "react-bootstrap";
import Loading from "../Loading";
import TopUserItem from "./TopUserItem";

export default function TopUsersList({ topUsers, loading }) {
  return (
    <div className="top-user-wrapper my-4">
      <h2 className="text-center pt-3 top-user-header">TOP USERS</h2>
      <Row className="justify-content-center py-4">
        {topUsers.map((topUser, i) => {
          const {
            user_id: userId,
            name,
            email,
            total_responses: totalResponses,
          } = topUser;
          return (
            <Col md={3} key={userId}>
              <TopUserItem
                key={i}
                userId={userId}
                name={name}
                email={email}
                totalResponses={totalResponses}
              />
            </Col>
          );
        })}
      </Row>
      {loading && <Loading height={240} />}
    </div>
  );
}
