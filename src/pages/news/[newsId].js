import { Col, Row } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import RootLayout from "@/components/Layouts/RootLayout";

const NewsDetailPage = ({ news }) => (
  <Row style={{ marginTop: "80px", alignItems: "center" }}>
    <Col md={6} lg={12}>
      <Image
        alt="example"
        src={news?.image_url}
        width={500}
        height={300}
        responsive
      />
    </Col>
    <Col md={6} lg={12} style={{ paddingLeft: "20px" }}>
      <h1 style={{ fontSize: "30px" }}>{news?.title}</h1>
      <span
        style={{
          color: "gray",
          display: "block",
          fontSize: "20px",
        }}
      >
        <UserOutlined /> {news?.author}
      </span>
      <div
        className="line"
        style={{
          height: "5px",
          margin: "20px 0",
          background: "#000",
          width: "100%",
        }}
      ></div>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          color: "gray",
          margin: "10px 0px",
          fontSize: "20px",
        }}
      >
        <span>
          <CalendarOutlined /> {news?.release_date}
        </span>
        <span>
          <CommentOutlined /> {news?.comment_count} Comments
        </span>
        <span>
          <ProfileOutlined /> {news?.category}
        </span>
      </p>

      <p style={{ fontSize: "25px", fontWeight: "lighter" }}>
        {news?.description}
      </p>
    </Col>
  </Row>
);
export default NewsDetailPage;

NewsDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

// export const getStaticPaths = async () => {
//   const res = await fetch("https://news-server-ecru.vercel.app/news");
//   const newses = await res.json();
//   console.log("New Detail1 ", newses?.data);
//   const paths = newses?.data.map((news) => ({
//     params: { newsId: news.id },
//   }));

//   return { paths, fallback: false };
// };

export const getServerSideProps = async (context) => {
  const { params } = context;
  const res = await fetch(
    `https://news-server-ecru.vercel.app/news/${params.newsId}`
  );
  const data = await res.json();
  console.log("New Detail ", data);

  return {
    props: {
      news: data,
    },
  };
};
