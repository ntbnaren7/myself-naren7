import { blogs, profile } from "../../data/portfolio";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { ViewAllLink } from "../ui/ViewAllLink";

export function BlogSection() {
  return (
    <section id="blogs" className="portfolio-section blog-section">
      <SectionHeading>Blogs</SectionHeading>
      {blogs.map((blog, i) => (
        <a
          className={`blog-row ${i === blogs.length - 1 ? "full-divider" : "local-divider"}`}
          href={blog.url}
          key={blog.title}
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <h3>{blog.title}</h3>
            <div className="blog-meta">
              <span>
                <Icon name="calendar" />
                {blog.date}
              </span>
              <span className="blog-claps">♧ &nbsp;0</span>
              <i />
              {blog.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Icon name="arrow-right" size={16} />
        </a>
      ))}
      <ViewAllLink href={profile.blogUrl} />
    </section>
  );
}
