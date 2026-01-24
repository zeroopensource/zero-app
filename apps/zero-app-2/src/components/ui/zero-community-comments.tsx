"use client";

import Giscus from "@giscus/react";

export const ZeroCommunityComments = () => (
  <div className="mt-8">
    <Giscus
      category="Comments"
      categoryId="DIC_kwDOQw8Las4C0YYe"
      emitMetadata="1"
      id="comments"
      inputPosition="top"
      lang="en"
      loading="lazy"
      mapping="url"
      reactionsEnabled="1"
      repo="zeroopensource/zero-community"
      repoId="R_kgDOQw8Lag"
      term="Welcome!"
      theme="dark"
    />
  </div>
);
