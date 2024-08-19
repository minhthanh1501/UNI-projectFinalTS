import ButtonCustom from "@/components/commons/ButtonCustom"
import { Result } from "antd"


const Main404Error = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <ButtonCustom nameButton="back home" type="default" />
            }
        />
    )
}

export default Main404Error