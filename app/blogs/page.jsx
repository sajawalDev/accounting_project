"use client";

import { useState, useEffect } from "react";
import Styles from "../../src/CSS/Blogs.module.css";

const BlogsPage = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/sajawalDev/hkfinanace-blogs-data/main/blogs.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogsData
      : blogsData.filter((blog) => blog.subheading === selectedCategory);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setLoading(true);
    setTimeout(() => setLoading(false), 300); // simulate loading
  };

  return (
    <div className={Styles.mainContainer}>
      <div className="container">
        {/* ====== Category Filter ====== */}
        <div className={Styles.blogsHeading}>
          <h2>Choose a Category</h2>
          <div className={Styles.Category}>
            {[
              "All",
              "Bookkeeping & Accounting",
              "Financial Strategy & Reporting",
              "Audit, Compliance & Risk Management",
              "Tax Planning & Business Advisory",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={selectedCategory === cat ? Styles.active : ""}
              >
                {cat === "All"
                  ? "All"
                  : cat === "Bookkeeping & Accounting"
                  ? "Bookkeeping"
                  : cat === "Financial Strategy & Reporting"
                  ? "Reporting"
                  : cat === "Audit, Compliance & Risk Management"
                  ? "Audit & Compliance"
                  : "Tax & Advisory"}
              </button>
            ))}
          </div>
        </div>

        {/* ====== Blog Cards ====== */}
        <div className="row">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className={`${Styles.blogCard} ${Styles.skeletonCard}`}
                  >
                    <div
                      className={`${Styles.imagePlaceholder} ${Styles.skeleton}`}
                    />
                    <div className={Styles.blogContent}>
                      <div
                        className={`${Styles.skeleton} ${Styles.skeletonText}`}
                      />
                      <div
                        className={`${Styles.skeleton} ${Styles.skeletonTitle}`}
                      />
                    </div>
                  </div>
                </div>
              ))
            : filteredBlogs.length > 0
            ? filteredBlogs.map((blog, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  {/* Blog Card Link */}
                  <a
                    href={`/blog/${blog.slug}`}
                    className={Styles.blogCard}
                    target="_self" // Change to "_blank" if you want always open new tab
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className={Styles.imagePlaceholder}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        unoptimized={true}
                        className={Styles.ImageBlog}
                      />
                    </div>
                    <div className={Styles.blogContent}>
                      <p className={Styles.subheading}>{blog.subheading}</p>
                      <h4 className={Styles.title}>{blog.title}</h4>
                    </div>
                  </a>
                </div>
              ))
            : (
              <p className="text-center mt-4">
                No blogs available for this category.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
