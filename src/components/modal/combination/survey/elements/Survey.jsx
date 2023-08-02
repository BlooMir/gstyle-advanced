import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Radio, Button, Modal, Space } from 'antd';
import { useMenuStore } from '../../../../../stores/menu/menu';
import { useModalStore } from '../../../../../stores/common/common';
import EachMenuform from './EachMenuform';


const Survey = () => {
    // Zustand 모달 Boolean 값/set함수 불러오기
    const { isOpen, setIsOpen } = useModalStore();
    // 모달 닫기
    const closeModal = () => setIsOpen(false);
    // react-hook-form 을 통한 form 관리
    const { control, handleSubmit, formState: { errors } } = useForm();


    // 폼 데이터 처리 구문
    const onSubmit = (data) => {
        console.log(data);
        closeModal();
      };
  
    return (
        <Modal 
            title="test"
            open={isOpen}
            onCancel={closeModal}
            maskClosable={false}
            footer={null}
        >
            {/* 폼 입력 시작 */}
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
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
                            message: '학번은 숫자만 입력 가능하며, 5자리 이하여야합니다.'
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
                        <Radio.Group {...field} buttonStyle='solid'>
                        <Radio.Button value="매우나쁨">매우나쁨</Radio.Button>
                        <Radio.Button value="나쁨">나쁨</Radio.Button>
                        <Radio.Button value="좋음">좋음</Radio.Button>
                        <Radio.Button value="매우좋음">매우좋음</Radio.Button>
                        </Radio.Group>
                    )}
                    />
                </Form.Item>
                {/* 급식 만족도 입력 끝 */}

                {/* 메뉴별 급식 만족도 입력 시작 */}
                <div>3. 메뉴별 급식 만족도</div>

                {/* 메뉴별 급식 만족도 입력 끝 */}

                {/* 제출 버튼 */}
                <Form.Item style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingTop: '10px'
                }}>
                    <Space>
                        <Button type='default' htmlType='reset'>취소</Button>
                        <Button type="primary" htmlType="submit">제출</Button>
                    </Space>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default Survey;