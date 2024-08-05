import ButtonCustom from '@/components/commons/ButtonCustom';
import { CloseOutlined, SaveFilled } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { Tree } from 'antd';
import type { TreeProps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAddMenuToGroup, apiCheckMenuForGroup, apiGetMenus } from '../../apis';
import { Menus } from '../../@types/menu.type';
import { transformMenuToTreeData } from '@/utils/helpers';
import { useQueryParams } from '@/hooks/useQueryParams';
import toast from 'react-hot-toast';

interface TreeDataNode {
    title: string;
    key: string;
    _id: string;
    children?: TreeDataNode[];
}

const ListMenu = () => {
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]); // hiển thị phần tử con
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);   // checked phần tử
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const [codeMenu, setCodeMenu] = useState<string[]>([])

    const [menus, setMenus] = useState<Menus>([])
    const [menusTreeData, setMenusTreeData] = useState<TreeDataNode[]>();

    const navigate = useNavigate()
    const { gid } = useQueryParams()

    const CheckMenuForGroupQuery = useQuery({
        queryKey: ["menus-for-group"],
        queryFn: () => apiCheckMenuForGroup(gid || ""),
        enabled: Boolean(gid),
    })

    useEffect(() => {
        if (CheckMenuForGroupQuery.data) {
            setCodeMenu(CheckMenuForGroupQuery.data.data.groupData)
            setCheckedKeys(CheckMenuForGroupQuery.data.data.groupData || [])
        }
    }, [CheckMenuForGroupQuery.data])

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
            setExpandedKeys(['He-thong', 'Kinh-te'])
            if (codeMenu) {
                // setCheckedKeys(['He-thong'])
                setCheckedKeys(codeMenu)
            }
        }
    }, [menus]);

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue as React.Key[]);

    };

    const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const AddMenuToGroupMutation = useMutation({
        mutationFn: (value: { code: React.Key[], gid: string | null }) => apiAddMenuToGroup(value)
    })

    const handleSubmit = () => {
        AddMenuToGroupMutation.mutate({ code: checkedKeys, gid }, {
            onSuccess: () => {
                toast.success("Cập nhật thành công")
            },
            onError: () => {
                toast.success("Cập nhật thất bại")
            }
        })
    }

    console.log(checkedKeys);

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgBase: "#141414",
                        colorText: "white",
                        colorTextDescription: "white",
                        colorFillTertiary: "white",
                        colorFill: "white"
                    },
                    components: {
                        Tree: {
                            nodeHoverBg: "red",
                            nodeSelectedBg: "transparent"
                        }
                    }
                }}
            >
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={menusTreeData}
                    showLine
                />
            </ConfigProvider>
            <div className='flex justify-center gap-3'>
                <ButtonCustom
                    icon={<SaveFilled />}
                    nameButton={"Cập nhật"}
                    style={{}}
                    onClick={handleSubmit}
                    htmlType='submit'
                />
                <ButtonCustom
                    icon={<CloseOutlined />}
                    nameButton={"Hủy"}
                    style={{
                        backgroundColor: "transparent",
                        color: 'white'
                    }}
                    type='default'
                    onClick={() => navigate(-1)}
                />
            </div>
        </>
    )
}

export default ListMenu