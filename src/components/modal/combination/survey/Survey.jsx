import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Radio, Button } from 'antd';

const Survey = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data); // 폼 데이터 출력
      };

    return (

        <Form onFinish={handleSubmit(onSubmit)}>
            {/* 학번 입력 */}
            <Form.Item
                label="학번"
                help={errors.studentNumber && errors.studentNumber.message}
                validateStatus={errors.studentNumber ? 'error' : ''}
            >
                <Controller
                name="studentNumber"
                control={control}
                rules={{
                    required: '학번을 입력해주세요.',
                    pattern: {
                    value: /^[0-9]{1,5}$/,
                    message: '학번은 숫자만 입력 가능하며, 최대 5자리까지 입력할 수 있습니다.'
                    }
                }}
                render={({ field }) => <Input {...field} type="number" />}
                />
            </Form.Item>

            {/* 급식 만족도 입력 */}
            <Form.Item
                label="오늘의 급식 만족도"
                help={errors.satisfaction && errors.satisfaction.message}
                validateStatus={errors.satisfaction ? 'error' : ''}
            >
                <Controller
                name="satisfaction"
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
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">제출</Button>
            </Form.Item>

        </Form>
    );
};

export default Survey;