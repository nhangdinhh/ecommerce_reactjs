import React from "react";
import "../components/News.css";
import new1Img from '../images/new1.jpg';
import new2Img from '../images/new2.jpg';
import new3Img from '../images/new3.jpg';
import new4Img from '../images/new4.jpg';
import new5Img from '../images/new5.jpg';
import new6Img from '../images/new6.jpg';

const TechNews = () => {
  const articles = [
    {
      title: "T1 đã nắc BLG và giành chức cúp vô địch CKTG 2024 dễ dàng như thế nào?",
      date: "Thứ Tư, 10/01/2024",
      imageUrl: new1Img,
      link: "https://vnexpress.net/"
    },
    {
      title: "Laptop Lenovo Legion hiện tại đã dẫn đầu BXH Laptop 2024! ",
      date: "Thứ Hai, 05/01/2024",
      imageUrl: new2Img,
      link: "https://vnexpress.net/"
    },
    {
      title: "Iphone 16 chưa ra mắt bao lâu mà Apple đã tung ra bản thử nghiệm Iphone 17!",
      date: "Thứ Sáu, 09/01/2024",
      imageUrl: new3Img,
      link: "https://vnexpress.net/"
    },
    {
      title: "Bitcoin chạm mốc khủng, không làm mà có ăn là có thật!",
      date: "Thứ Năm, 05/01/2024",
      imageUrl: new4Img,
      link: "https://vnexpress.net/"
    },
    {
      title: "Trở nên master Chat-GPT chỉ bằng cách nâng cấp bản pro!",
      date: "Thứ Bảy, 09/01/2024",
      imageUrl: new5Img,
      link: "https://vnexpress.net/"
    },
    {
      title: "Elon Musk sẽ đến Việt Nam để trao tặng 1000 tỷ USD cho người may mắn ở Đà Nẵng?",
      date: "Thứ Sáu, 19/06/2024",
      imageUrl: new6Img,
      link: "https://vnexpress.net/"
    },
  ];

  return (
    <div className="tech-news-container">
      <div className="header-container">
        <h2 className="header-tech-news">NEWS</h2>
        <a href="https://vnexpress.net/" className="view-all" target="_blank" rel="noopener noreferrer">
          View All
        </a>
      </div>
      <div className="container">
        <div className="articles-container">
          <div className="article-first">
            <img src={articles[0].imageUrl} alt={articles[0].title} />
            <a href={articles[0].link} target="_blank" rel="noopener noreferrer"><h3>{articles[0].title}</h3></a>
            <p>{articles[0].date}</p>
          </div>
        </div>
        <div className="container-news">
          {articles.slice(1).map((article, index) => (
            <div className="article" key={index}>
              <div className="image-container">
                <img src={article.imageUrl} alt={article.title} />
              </div>
              <div className="content-container">
                <a href={article.link} target="_blank" rel="noopener noreferrer"><h3>{article.title}</h3></a>
                <p>{article.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechNews;
