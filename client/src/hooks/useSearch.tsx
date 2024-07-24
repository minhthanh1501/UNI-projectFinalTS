import { Form, FormInstance } from "antd";
import { useSearchParams } from "react-router-dom";

interface UserSearchProps {
    form: FormInstance;
    keys: string[];
    onSuccess?: (value: object) => void;
};

const useSearch = ({ keys, form, onSuccess }: UserSearchProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const _form = form || Form.useForm();

    if (!keys.length) return;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = searchParams.get(key);
        if (value) {
            _form.setFieldValue(key, value)
        }
    }

    const setParams = (Obj: any) => {
        const keyArr = Object.keys(Obj);

        keyArr.forEach((key) => {
            if (Obj[key]) {
                searchParams.set(key, Obj[key]);
            } else {
                searchParams.delete(key);
            }
            setSearchParams(searchParams);
        });
    }

    const handleSubmit = () => {
        const formValues = _form.getFieldsValue(true);
        setParams(formValues);
        onSuccess && onSuccess(formValues);
    }

    return {
        handleSubmit
    }
}

export default useSearch