'use client';

import * as React from 'react';
import { useToggleToolbox } from '@/hooks/use-toggle-toolbox';

interface Tool {
    id: string;
    name: string;
    items: ToolItem[];
    // onClick: () => void;
}

interface ToolItem {
    id: string;
    icon: string;
    label: string;
}

export function Toolbox() {
    const isToolboxOpen = useToggleToolbox((state) => state.isOpen);

    const tools: Tool[] = [
        {
            id: 'basic-tools',
            name: '基础工具',
            items: [
                { id: 'tool1', icon: '📚', label: '阅读模式' },
                { id: 'tool2', icon: '🔤', label: '翻译' },
                { id: 'tool3', icon: '🔄', label: '刷新' },
                { id: 'tool4', icon: '✂️', label: '截图' },
                { id: 'tool5', icon: '🖥️', label: '全屏' },
                { id: 'tool6', icon: '🔗', label: '链接' },
            ]
        },
        {
            id: 'more-tools',
            name: '更多工具',
            items: [
                { id: 'tool7', icon: '📝', label: '笔记' },
                { id: 'tool8', icon: '🎯', label: '目标' },
            ]
        }
    ];

    return isToolboxOpen ? (
        <div className="fixed left-14 top-0 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
            {tools.map((section) => (
                <div key={section.id} className="mb-6">
                    <h3 className="text-sm text-gray-600 mb-3">{section.name}</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {section.items.map((item) => (
                            <button
                                key={item.id}
                                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg"
                            >
                                <span className="text-xl mb-1">{item.icon}</span>
                                <span className="text-xs text-gray-600">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full text-center text-purple-600 text-sm flex items-center justify-center gap-2">
                    <span>探索更多工具</span>
                    <span>→</span>
                </button>
            </div>
        </div>
    ) : null;
} 