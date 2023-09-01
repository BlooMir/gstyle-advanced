import React from 'react';
import { Form, Input, Radio, Button, Modal, Select, Divider } from 'antd';
import { useMenuStore } from '../../../../../stores/menu/menu';
import { useModalStore } from '../../../../../stores/common/common';
import axios from 'axios';




const Survey = () => {
    // 오늘의 메뉴 정보 불러오기
    const { todayMenu } = useMenuStore(); 

    // Zustand 모달 Boolean 값/set함수 불러오기
    const { isOpen, setIsOpen } = useModalStore();

    // 모달 닫기
    const closeModal = () => setIsOpen(false);

    // 폼 데이터 처리 구문
    const onSubmit = (data) => {
        axios.post(`api/survey/insert`,{
            stuno: data.stuno,
            erating: data.erating,
            detailSurvey: data.mrating.map((menus, index) => menus + data.mreason[index]).join('|')
        }).then((res) => {
            console.log(res)
        })
        closeModal();
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
            <Form layout='vertical' onFinish={onSubmit}>

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
                            <Radio.Group buttonStyle='solid' style={{marginTop:'15px'}}>
                                <Radio.Button value={menu + "_매우나쁨_"}>매우나쁨</Radio.Button>
                                <Radio.Button value={menu + "_나쁨_"}>나쁨</Radio.Button>
                                <Radio.Button value={menu + "_좋음_"}>좋음</Radio.Button>
                                <Radio.Button value={menu + "_매우좋음_"}>매우좋음</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        
                        <Form.Item 
                            name={['mreason', index]} 
                            rules={[{ required: true, message: '이유를 선택해주세요.' }]}
                        >
                                <Select 
                                    allowClear
                                    options={[
                                        {
                                            label: '좋았다면?',
                                            options: [
                                                {lable: '배식량이 만족스러웠다' , value: '배식량이 만족스러웠다'},
                                                {lable: '간이 적절했다', value: '간이 적절했다'},
                                                {lable: '메뉴가 맛있었다', value: '메뉴가 맛있었다'},
                                                {lable: '좋아하는 메뉴다' , value: '좋아하는 메뉴다'}
                                            ],
                                        },
                                        {
                                            label: '좋지 못했다면?',
                                            options: [
                                                { lable: '너무 싱겁다', value: '너무 싱겁다' },
                                                { lable: '너무 짜다', value: '너무 짜다' },
                                                { lable: '양이 적다', value: '양이 적다' },
                                                { lable: '싫어하는 메뉴다', value: '싫어하는 메뉴다' }
                                            ],
                                        }
                                    ]}
                                    placeholder="만족도 선택의 이유는 무엇인가요?"
                                />
                        </Form.Item>
                        <Divider/>
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