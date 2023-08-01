import React from 'react';
import { Form, Radio, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
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
                    options={[
                        { value: '양이 적당했다', label: '양이 적당했다' },
                        { value: '간이 맞았다', label: '간이 맞았다' },
                        { value: '맛있었다', label: '맛있었다' },
                        { value: '좋아하는 음식이였다', label: '좋아하는 음식이였다' }
                    ]}
                />
                <Select
                    options={[
                        { value: '너무 싱거웠다', label: '너무 싱거웠다' },
                        { value: '너무 짰다', label: '너무 짰다' },
                        { value: '양이 적었다', label: '양이 적었다' },
                        { value: '안좋아하는 음식이다', label: '안좋아하는 음식이다' }
                      ]}
                />
            </Form.Item>
    );
};

export default EachMenuform;