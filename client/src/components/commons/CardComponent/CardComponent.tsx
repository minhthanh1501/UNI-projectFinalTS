import { Card } from "antd"
import { CardSize } from "antd/es/card/Card"
import { Fragment } from "react/jsx-runtime"
import ButtonCustom from "../ButtonCustom"

export interface CardComponentProps {
    title?: React.ReactNode
    size?: CardSize | undefined
    extra?: React.ReactNode
    className?: string
    loading?: boolean
    bordered?: boolean
    children: React.ReactNode
}

const CardComponent: React.FC<CardComponentProps> = ({ title, className, loading, size, extra, bordered, children }) => {
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

export default CardComponent