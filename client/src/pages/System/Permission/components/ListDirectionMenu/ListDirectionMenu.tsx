import { ConfigProvider, Tree } from 'antd';
import type { GetProps } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiGetMenus } from '@/pages/System/Group/apis';
import { transformMenuToDirectionTreeData } from '@/utils/helpers';
import { Menus } from '@/pages/System/Group/@types/menu.type';
import { useLocation, useNavigate } from 'react-router-dom';
import { BasicDataNode, DataNode, EventDataNode } from 'antd/es/tree';
import { AppContext } from '@/contexts/app.context';
interface CustomDataNode extends DataNode {
    _id: string;
}

function isCustomDataNode(node: EventDataNode<BasicDataNode | DataNode>): node is EventDataNode<CustomDataNode> {
    return '_id' in node;
}

interface TreeDataNode {
    title: string;
    key: string;
    _id: string;
    parent_id: string;
    children?: TreeDataNode[];
}

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const ListDirectionMenu = () => {
    const [menus, setMenus] = useState<Menus>()
    const [menusTreeData, setMenusTreeData] = useState<TreeDataNode[]>()

    const navigate = useNavigate()
    const location = useLocation()
    const { breadcrumbItem, setBreadcrumbItem } = useContext(AppContext)


    const GetListMenuQuery = useQuery({
        queryKey: ["menus-direction"],
        queryFn: () => apiGetMenus()
    })

    useEffect(() => {
        if (GetListMenuQuery.data) {
            setMenus(GetListMenuQuery.data.data.menuData)
        }
    }, [GetListMenuQuery.data])

    useEffect(() => {
        if (menus) {
            const transformedTreeData = transformMenuToDirectionTreeData(menus);
            setMenusTreeData(transformedTreeData);
        }
    }, [menus]);

    const buildBreadcrumb = (node: CustomDataNode, menuTreeData: TreeDataNode[], breadcrumb: { title: string }[] = []): { title: string }[] => {
        // Thêm node hiện tại vào breadcrumb
        breadcrumb.unshift({ title: node.title });

        // Tìm menu cha dựa trên parent_id của node hiện tại
        const parentNode = menuTreeData.find(menu => menu._id === node.parent_id);

        console.log(menus);

        if (parentNode) {
            // Nếu tìm thấy menu cha, tiếp tục đệ quy lên đến gốc
            return buildBreadcrumb(parentNode as CustomDataNode, menuTreeData, breadcrumb);
        }

        // Nếu không còn menu cha, trả về breadcrumb đã xây dựng
        return breadcrumb;
    };

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info.node);
        if (isCustomDataNode(info.node)) {
            // Gọi hàm đệ quy để xây dựng breadcrumb
            const newBreadcrumbItems = buildBreadcrumb(info.node as CustomDataNode, menusTreeData || []);

            // Cập nhật breadcrumbItem với toàn bộ đường dẫn từ gốc đến node được chọn
            setBreadcrumbItem(newBreadcrumbItems);

            // Điều hướng tới URL với menu_parent_id của node được chọn
            navigate(`${location.pathname}?menu_parent_id=${info.node._id}`);
        } else {
            console.error('Selected node does not have an _id property');
        }
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        // console.log('Trigger Expand', keys, info);
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
                defaultExpandAll
                multiple
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={menusTreeData}
            // expandedKeys={['Phan-quyen']}
            />
        </ConfigProvider>
    );
}

export default ListDirectionMenu