import React from "react";
import Layout from "../Layout/Layout";
function About() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto p-3 text-center">
          <div>
            <h1 className="text-3xl font-semibold text-center">Iamhaao Blog</h1>
            <div className="text-md text-gray500 flex flex-col gap-6">
              <p>
                "IAMHAO Blog" is a dynamic online platform that serves as a hub
                for diverse and engaging content, catering to a wide range of
                interests and passions. From thought-provoking articles on
                current affairs and societal issues to insightful pieces on
                technology trends and lifestyle tips, IAMHAO Blog offers a
                multifaceted experience for its readers. With a commitment to
                delivering high-quality and relevant content, the blog stands
                out as a valuable resource for individuals seeking information,
                inspiration, and entertainment. Whether delving into in-depth
                analyses of global events or offering practical advice for
                personal development, IAMHAO Blog consistently strives to
                inform, entertain, and enrich the lives of its audience, making
                it a go-to destination for those hungry for knowledge and
                perspective in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
