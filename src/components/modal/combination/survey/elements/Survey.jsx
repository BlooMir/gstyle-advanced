import React, { useState }from 'react';
import { Form, Input, Radio, Button, Modal, Select, Divider, notification } from 'antd';
import { useMenuStore } from '../../../../../stores/menu/menu';
import { useModalStore } from '../../../../../stores/common/common';
import { GOOD_REASONS, BAD_REASONS } from '../../../../../constants/constans';
import axios from 'axios';


const Survey = () => {
    const [form] = Form.useForm();

    // 오늘의 메뉴 정보 불러오기
    const { todayMenu } = useMenuStore(); 

    // Zustand 모달 Boolean 값/set함수 불러오기
    const { isOpen, setIsOpen } = useModalStore();

    // 모달 닫기
    const closeModal = () => setIsOpen(false);

    // 토스트 메시
    const openNotification = () => {
        notification.success({
          message: '제출 완료',
          description: '설문조사가 성공적으로 제출되었습니다.',
        });
      };

    const onSubmit = (data) => {
        showConfirm(data); // 확인 알림
    };

    const showConfirm = (formData) => {
        Modal.confirm({
            title: '입력한 내용이 확실합니까?',
            content: `학번과 설문조사 내용을 올바르게 기입해주세요`,
          onOk() {
            axios.post(`api/survey/insert`,{
                stuno: formData.stuno,
                erating: formData.erating,
                detailSurvey: formData.mrating.map((menus, index) => menus + formData.mreason[index]).join('|')
            }).then(() => {
              openNotification(); // Toast 메시지
              closeModal();
            });
            form.resetFields(); // 폼 리셋
          },
        });
      };


    // // 폼 데이터 처리 구문
    // const onSubmit = (data) => {
        // axios.post(`api/survey/insert`,{
        //     stuno: data.stuno,
        //     erating: data.erating,
        //     detailSurvey: data.mrating.map((menus, index) => menus + data.mreason[index]).join('|')
    //     }).then((res) => {
    //         openNotification();
    //     })
    //     form.resetFields();
    //     closeModal();
    //   };

    const [selectedOptions, setSelectedOptions] = useState({}); // 추가된 코드

    const handleRadioChange = (e, index) => { 
        const value = e.target.value.split('_')[1]; 
        const updatedOptions = { ...selectedOptions };
        updatedOptions[index] = value.includes("나쁨") ? 'bad' : 'good';
        setSelectedOptions(updatedOptions);
      };

    return (
        <Modal 
            title={`${todayMenu.lunchDate} 설문조사`}
            open={isOpen}
            onCancel={closeModal}
            maskClosable={false}
            footer={null}
        >
            {/* 폼 입력 시작 */}
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                {/* 학번 입력 시작*/}
                <Form.Item 
                    label="1. 학번을 입력해주세요" 
                    name='stuno'
                    tooltip='1학년 1반 1번 = 10101'
                    rules={[
                        { 
                            required: true,
                            message: '학번을 입력해주세요'
                        },    
                        {
                            pattern: /^[0-9]{1,5}$/,
                            message: '학번은 5자리 이하여야 합니다.'
                        }
                    ]}
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
                <Divider/>
                {/* 메뉴별 급식 만족도 입력 시작 */}
                {todayMenu.menus.map((menu, index) => (
                    <div key={index}>
                        <span>{menu}</span>

                        <Form.Item 
                        name={['mrating', index]}
                        rules={[{ required: true, message: '메뉴 만족도를 선택해주세요.' }]}
                        >
                        {/* 메뉴 만족도 버튼 시작 */}
                        <Radio.Group 
                            buttonStyle='solid' 
                            style={{marginTop:'15px'}}
                            onChange={(e) => handleRadioChange(e, index)} // 추가된 코드, by chatGPT
                        >
                            <Radio.Button value={menu + "_매우나쁨_"}>매우나쁨</Radio.Button>
                            <Radio.Button value={menu + "_나쁨_"}>나쁨</Radio.Button>
                            <Radio.Button value={menu + "_좋음_"}>좋음</Radio.Button>
                            <Radio.Button value={menu + "_매우좋음_"}>매우좋음</Radio.Button>
                        </Radio.Group>
                        </Form.Item>
                        {/* 메뉴 만족도 버튼 끝 */}

                        {/* 만족도에 따른 이유 선택란 시작 */}
                        <Form.Item 
                        name={['mreason', index]} 
                        rules={[{ required: true, message: '이유를 선택해주세요.' }]}
                        >
                        {/* 조건부 렌더링 , By chatGPT */}
                        {
                        selectedOptions[index] === 'good' ? (
                            <Select allowClear options={GOOD_REASONS} placeholder="좋았다면?"/>
                        ) : 
                        selectedOptions[index] === 'bad' ? (
                            <Select allowClear options={BAD_REASONS} placeholder="좋지 못했다면?"/>
                        ) : 
                        (
                            <Select disabled placeholder="만족도 선택의 이유는 무엇인가요?" />
                        )}
                        </Form.Item>
                        {/* 만족도에 따른 이유 선택란 끝 */}

                        <Divider />

                    </div>
                    ))}
                {/* 메뉴별 급식 만족도 입력 끝 */}

                {/* 제출 버튼 */}
                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type="primary" htmlType="submit">제출</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Survey;