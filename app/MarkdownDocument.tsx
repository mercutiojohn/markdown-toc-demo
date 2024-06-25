import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';
import { Disclosure } from '@headlessui/react';

interface Props {
  markdown: string;
}

const MarkdownDocument: React.FC<Props> = ({ markdown }) => {
  return (
    <div className="markdown-body">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="button">
              {open ? 'Hide Table of Contents' : 'Show Table of Contents'}
            </Disclosure.Button>
            <Disclosure.Panel>
              <ReactMarkdown
                children={markdown}
                remarkPlugins={[
                  remarkGfm,
                  remarkSlug,
                  [remarkToc, { heading: 'toc-head' }],
                ]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 id={props.children.toString()} {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 id={props.children.toString()} {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 id={props.children.toString()} {...props} />
                  ),
                  // 更多标题处理
                }}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm, remarkSlug]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 id={props.children.toString()} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 id={props.children.toString()} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 id={props.children.toString()} {...props} />
          ),
          // 更多标题处理
        }}
      />
    </div>
  );
};

export default MarkdownDocument;
