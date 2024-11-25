import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

const defaultComputedFields: ComputedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => {
            const pathSegments = doc._raw.flattenedPath.split('/');
            const firstSegment = pathSegments[0];
            const lastSegment = pathSegments[pathSegments.length - 1];
            const path = `${firstSegment}/${lastSegment}`;
            return path;
        },
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => {
            const pathSegments = doc._raw.flattenedPath.split('/');
            let path = pathSegments[pathSegments.length - 1];
            if (pathSegments.length === 2) {
                path = '';
            }
            return path;
        },
    },
    locale: {
        type: 'string',
        resolve: (doc) => {
            const pathSegments = doc._raw.flattenedPath.split('/');
            const locale = pathSegments[1];
            return pathSegments[1];
        },
    },
};

export const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: `docs/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        published: {
            type: 'boolean',
            default: true,
        },
    },
    computedFields: defaultComputedFields,
}));

export const ChangeLog = defineDocumentType(() => ({
    name: 'ChangeLog',
    filePathPattern: `changelog/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        date: {
            type: 'date',
            required: true,
        },
        image: {
            type: 'string',
            required: true,
        },
    },
    computedFields: defaultComputedFields,
}));

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `blog/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        date: {
            type: 'date',
            required: true,
        },
        published: {
            type: 'boolean',
            default: true,
        },
        image: {
            type: 'string',
            required: true,
        },
    },
    computedFields: defaultComputedFields,
}));

export const Page = defineDocumentType(() => ({
    name: 'Page',
    filePathPattern: `page/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
    },
    computedFields: defaultComputedFields,
}));

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Page, Doc, ChangeLog, Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === 'element' && node?.tagName === 'pre') {
                        const [codeEl] = node.children;

                        if (codeEl.tagName !== 'code') return;

                        node.__rawString__ = codeEl.children?.[0].value;
                    }
                });
            },
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    keepBackground: false,
                    onVisitLine(node) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }];
                        }
                    },
                },
            ],
            () => (tree) => {
                visit(tree, (node) => {
                    if (node?.type === 'element' && node?.tagName === 'figure') {
                        if (!('data-rehype-pretty-code-figure' in node.properties)) {
                            return;
                        }

                        const preElement = node.children.at(-1);
                        if (preElement.tagName !== 'pre') {
                            return;
                        }

                        preElement.properties['__rawString__'] = node.__rawString__;
                    }
                });
            },
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    },
});
