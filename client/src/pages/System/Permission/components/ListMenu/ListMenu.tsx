import { ConfigProvider, Tree } from 'antd';
import type { GetProps, TreeProps } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiGetMenus } from '@/pages/System/Group/apis';
import { transformMenuToTreeData } from '@/utils/helpers';
import { Menus } from '@/pages/System/Group/@types/menu.type';
import { useLocation, useNavigate } from 'react-router-dom';

interface TreeDataNode {
    title: string;
    key: string;
    _id: string;
    children?: TreeDataNode[];
}

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const ListMenu = () => {
    const [menus, setMenus] = useState<Menus>()
    const [menusTreeData, setMenusTreeData] = useState<TreeDataNode[]>()
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['Phan-quyen', 'He-thong', 'Kinh-te'])
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const navigate = useNavigate()
    const location = useLocation()

    const GetListMenuQuery = useQuery({
        queryKey: ["menus"],
        queryFn: () => apiGetMenus()
    })

    useEffect(() => {
        if (GetListMenuQuery.data) {
            setMenus(GetListMenuQuery.data.data.menuData)
        }
    }, [GetListMenuQuery.data])

    useEffect(() => {
        if (menus) {
            const transformedTreeData = transformMenuToTreeData(menus);
            setMenusTreeData(transformedTreeData);
        }
    }, [menus]);

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
        navigate(`${location.pathname}?key=${keys}`)
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgBase: "#141414",
                    colorText: "white",
                    colorTextDescription: "white",
                    colorFillTertiary: "white",
                    colorFill: "white",
                },
                components: {
                    Tree: {
                        controlItemBgHover: "#1c1c1c",
                    }
                }
            }}
        >
            <DirectoryTree
                showIcon={false}
                showLine={false}
                multiple
                // expandedKeys={expandedKeys}
                // autoExpandParent={true}
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={menusTreeData}
            />
        </ConfigProvider>
    );
}

export default ListMenu