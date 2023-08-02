import React from 'react';
import { Form, Input, Radio, Button, Modal, Space, Select } from 'antd';
import { useMenuStore } from '../../../../../stores/menu/menu';
import { useModalStore } from '../../../../../stores/common/common';


const Survey = () => {
    const { todayMenu } = useMenuStore(); 
    // Zustand 모달 Boolean 값/set함수 불러오기
    const { isOpen, setIsOpen } = useModalStore();
    // 모달 닫기
    const closeModal = () => setIsOpen(false);


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
            <Form layout='vertical' onFinish={onSubmit}>

                {/* 학번 입력 시작*/}
                <Form.Item
                    label="1. 학번을 입력해주세요"
                    name='stuno'
                    rules={[{ required: true, message: '학번을 입력해주세요.' }]}
                >
                    <Input type="number"/>
                </Form.Item>
                {/* 학번 입력 끝 */}

                {/* 급식 만족도 입력 시작 */}
                <Form.Item
                    label="2. 오늘의 급식 만족도"
                    name='erating'
                    rules={[{ required: true, message: '전체적인 급식 만족도를 선택해주세요.' }]}
                >
                    <Radio.Group buttonStyle='solid'>
                    <Radio.Button value="매우나쁨">매우나쁨</Radio.Button>
                    <Radio.Button value="나쁨">나쁨</Radio.Button>
                    <Radio.Button value="좋음">좋음</Radio.Button>
                    <Radio.Button value="매우좋음">매우좋음</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {/* 급식 만족도 입력 끝 */}


                {/* 메뉴별 급식 만족도 입력 시작 */}
                <label>3. 메뉴별 급식 만족도</label>
                {todayMenu.menus.map((menu, index) => (
                    <div key={index}>
                        <Form.Item 
                            label={menu} 
                            name={['menuSatis', index]}
                            rules={[{ required: true, message: '메뉴 만족도를 선택해주세요.' }]}
                        >
                            <Radio.Group buttonStyle='solid'>
                            <Radio.Button value="매우나쁨">매우나쁨</Radio.Button>
                            <Radio.Button value="나쁨">나쁨</Radio.Button>
                            <Radio.Button value="좋음">좋음</Radio.Button>
                            <Radio.Button value="매우좋음">매우좋음</Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item 
                            name={['additionalInfo', index]} 
                            rules={[{ required: true, message: '이유를 선택해주세요.' }]}>
                            <Select>
                                <Select.Option value="옵션1">옵션1</Select.Option>
                                <Select.Option value="옵션2">옵션2</Select.Option>
                                <Select.Option value="옵션3">옵션3</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                ))}
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