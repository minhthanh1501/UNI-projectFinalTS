import { Card } from "antd"
import { CardSize } from "antd/es/card/Card"

export interface CommonListProps {
    title?: React.ReactNode
    size?: CardSize
    extra?: React.ReactNode
    className?: string
    loading?: boolean
    bordered?: boolean
    children: React.ReactNode
}

const CommonList: React.FC<CommonListProps> = ({ title, className, loading, size, extra, bordered, children }) => {
    return (
        <Card
            title={title}
            bordered={bordered}
            extra={extra} size={size}
            className={className}
            loading={loading}
        >
            {children}
        </Card>
    )
}

export default CommonList