"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Styles from "../../../src/CSS/BlogDetail.module.css";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://raw.githubusercontent.com/sajawalDev/hkfinanace-blogs-data/main/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const foundBlog = data.find((b) => b.slug === slug);
        setBlog(foundBlog || null);

        if (foundBlog) {
          const related = data
            .filter(
              (b) =>
                b.subheading === foundBlog.subheading && b.slug !== foundBlog.slug
            )
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setRelatedBlogs(related);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={Styles.mainContainer}>
        <div className={`${Styles.parallaxImage} ${Styles.skeleton}`} />
        <div className={Styles.blogText}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className={`${Styles.skeleton} ${Styles.skeletonTitle}`} />
                <div
                  className={`${Styles.skeleton} ${Styles.skeletonSubheading}`}
                />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Styles.skeleton} ${Styles.skeletonParagraph}`}
                  />
                ))}
              </div>
              <div className="col-lg-4 col-12">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Styles.skeleton} ${Styles.skeletonRelated}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center mt-5">Blog not found.</p>;
  }

  // 🧠 Enhanced content processor
  const processContent = (text) => {
    const lines = text
      .split(/(?<=\?)|\r?\n/) // split by line or after question mark
      .map((line) => line.trim())
      .filter(Boolean);

    return lines.map((line, index) => {
      const startsWithNumber = /^\d+[\.\)]?\s*/.test(line); // "1.", "2)" etc.
      const endsWithQuestion = /\?\s*$/.test(line); // ends with "?"

      if (startsWithNumber || endsWithQuestion) {
        const cleanHeading = line.replace(/^\d+[\.\)]?\s*/, ""); // remove number prefix
        return (
          <h3 key={index} className={Styles.dynamicHeading}>
            {cleanHeading}
          </h3>
        );
      }

      return (
        <p key={index} className={Styles.paragraph}>
          {line}
        </p>
      );
    });
  };

  const formattedContent = processContent(blog.content);

  return (
    <div className={Styles.mainContainer}>
      {/* ===== Hero Section ===== */}
      <div
        className={Styles.parallaxImage}
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        <div className={Styles.overlay}>
          <div className={Styles.textOverlay}>
            <p className={Styles.subheading}>{blog.subheading}</p>
            <h1 className={Styles.title}>{blog.title}</h1>
          </div>
        </div>
      </div>

      {/* ===== Blog Body ===== */}
      <div className={Styles.blogText}>
        <div className="container">
          <div className="row">
            {/* Main Article */}
            <div className="col-lg-8">
              <div className={Styles.mainArticle}>
                <span>
                  <b>Article:</b>
                </span>
                {formattedContent}
              </div>
            </div>

            {/* Related Blogs */}
            <div className="col-lg-4">
              <h4>Related Blogs</h4>
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map((b) => (
                  <div
                    key={b.slug}
                    className={Styles.relatedCard}
                    onClick={() => router.push(`/blog/${b.slug}`)}
                  >
                    <div className={Styles.relatedCardimg}>
                      <img
                        src={b.image}
                        alt={b.title}
                        unoptimized={true}
                        className={Styles.relatedImg}
                      />
                    </div>
                    <p className={Styles.relatedTitle}>{b.title}</p>
                  </div>
                ))
              ) : (
                <p>No related blogs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
