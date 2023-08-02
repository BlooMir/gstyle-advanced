import React from 'react';
import { Form, Radio, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { MENU_BAD_RATING_REASON_LIST, MENU_GOOD_RATING_REASON_LIST } from '../../../../../constants/constans';
const EachMenuform = ({menuName}) => {

    const { control, formState: { errors } } = useForm();
    
    return (
        <Form.Item
                label={menuName}
                help={errors.mRating && errors.mRating.message}
                validateStatus={errors.mRating ? 'error' : ''}
            >
                <Controller
                name="mRating"
                control={control}
                rules={{ required: '급식 만족도를 선택해주세요.' }}
                render={({ field }) => (
                    <Radio.Group {...field}>
                    <Radio value="매우나쁨">매우나쁨</Radio>
                    <Radio value="나쁨">나쁨</Radio>
                    <Radio value="좋음">좋음</Radio>
                    <Radio value="매우좋음">매우좋음</Radio>
                    </Radio.Group>
                )}
                />
                <Select
                    options={MENU_GOOD_RATING_REASON_LIST}
                />
                <Select
                    options={MENU_BAD_RATING_REASON_LIST}
                />
            </Form.Item>
    );
};

export default EachMenuform;