import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Radio, Button } from 'antd';
import { useMenuStore } from '../../../../../stores/menu/menu';
import EachMenuform from './EachMenuform';


const Survey = () => {
    // 오늘의 메뉴 값 불러오기
    const { todayMenu } = useMenuStore();

    // react-hook-form 을 통한 form 관리
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
      };
  
    return (
        // 폼 입력 시작
        <Form 
            onFinish={handleSubmit(onSubmit)}
            layout='vertical'
        >
            {/* 학번 입력 시작*/}
            <Form.Item
                label="1. 학번을 입력해주세요"
                help={errors.stuno && errors.stuno.message}
                validateStatus={errors.stuno ? 'error' : ''}
            >
                <Controller
                    name="stuno"
                    control={control}
                    rules={{
                        required: '학번을 입력해주세요.',
                        pattern: {
                        value: /^[0-9]{1,5}$/,
                        message: '학번은 숫자만 입력 가능하며, 최대 5자리까지 입력할 수 있습니다.'
                        }
                    }}
                    render={({ field }) => <Input {...field} type="number"/>}
                />
            </Form.Item>
            {/* 학번 입력 끝 */}

            {/* 급식 만족도 입력 시작 */}
            <Form.Item
                label="2. 오늘의 급식 만족도"
                help={errors.erating && errors.erating.message}
                validateStatus={errors.erating ? 'error' : ''}
            >
                <Controller
                name="erating"
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
            {/* 급식 만족도 입력 끝 */}

            {/* 메뉴별 급식 만족도 입력 시작 */}
            <Form.Item
                label="3. 메뉴별 급식 만족도"
            >
                {/* EachMenuform 컴포넌트를 todayMenu 배열 인덱스 만큼 렌더링 */}
                {todayMenu.menus.map((menuName, index) => (
                    <EachMenuform
                        menuName={menuName}
                        key={index}
                    />
                ))}
            </Form.Item>
            {/* 메뉴별 급식 만족도 입력 끝 */}

            <Form.Item>
                <Button type="primary" htmlType="submit">제출</Button>
            </Form.Item>

        </Form>
    );
};

export default Survey;