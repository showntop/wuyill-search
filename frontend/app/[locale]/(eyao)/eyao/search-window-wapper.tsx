'use client';

import SearchBar from '@/components/search/search-bar';
import SearchWindow from '@/components/search/search-window';
import { useSourceStore } from '@/lib/store';
import { SearchCategory, User } from '@/lib/types';
import { LoaderCircle, SendHorizontal } from 'lucide-react';
import React from 'react';

export interface SearchPageProps {
    id: string;
    user: User;
}

export default function SearchWindowWapper({ id, user }: SearchPageProps) {
    const { source, setSource } = useSourceStore();
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [results, setResults] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (source != SearchCategory.PRODUCT_HUNT) {
            setSource(SearchCategory.PRODUCT_HUNT);
        }
    }, [source, setSource]);

    const handleSearch = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/eyao/query', {
                method: 'POST',
                headers: {
                    'Accept': 'text/event-stream',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query: input.trim() })
            });

            if (!response.ok) {
                throw new Error('搜索请求失败');
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('无法获取响应流');
            }

            const decoder = new TextDecoder();
            let accumulatedResults: string[] = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim());

                for (const linex of lines) {
                    try {
                        const line = linex.replaceAll("data:", "")
                        const data = JSON.parse(line);
                        if (data.answer) {
                            accumulatedResults.push(data.answer);
                            setResults([...accumulatedResults]);
                        }
                    } catch (e) {
                        console.error('解析响应数据失败:', e);
                    }
                }
            }

        } catch (error) {
            console.error('搜索出错:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
            <div className="w-full relative">
                <div className="relative flex items-center">
                    <textarea
                        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 pr-20 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                        placeholder="输入药名..."
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        className="absolute right-2 p-2 text-gray-500 hover:text-primary disabled:opacity-50"
                        onClick={handleSearch}
                        disabled={!input.trim()}
                    >
                        <span className="sr-only">搜索</span>
                        <SendHorizontal size={20} />
                    </button>
                </div>
            </div>
            {isLoading && (
                <div className="mt-4 flex items-center justify-center">
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                    <span className="ml-2">思考中...</span>
                </div>
            )}
            {results && (
                <div className="mt-4 w-full space-y-4">
                    {results.map((result, index) => (
                        <span key={index} className="text-gray-800">
                            {result}
                        </span>
                    ))}
                </div>
            )}
            <div className="mt-8 w-full">
                <h2 className="text-xl font-semibold mb-4">推荐阅读</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">常见药物使用指南</h3>
                        <p className="text-gray-600 text-sm">了解日常用药的注意事项和使用方法...</p>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">用药安全小贴士</h3>
                        <p className="text-gray-600 text-sm">专业医生为您解析用药安全知识...</p>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">用药安全小贴士</h3>
                        <p className="text-gray-600 text-sm">专业医生为您解析用药安全知识...</p>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">用药安全小贴士</h3>
                        <p className="text-gray-600 text-sm">专业医生为您解析用药安全知识...</p>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">用药安全小贴士</h3>
                        <p className="text-gray-600 text-sm">专业医生为您解析用药安全知识...</p>
                    </div>
                    <div className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-medium mb-2">用药安全小贴士</h3>
                        <p className="text-gray-600 text-sm">专业医生为您解析用药安全知识...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
