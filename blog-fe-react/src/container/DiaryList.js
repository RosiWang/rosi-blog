import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Api from '../service/ServiceApi'

class DiaryList extends Component {

    state = {
        list: null
    }

    componentDidMount() {
        console.log('DiaryList...', this.props.location);
        Api.diary().then(res => {
            if (res && res.code == 0) {
                console.log(res);
                this.setState({ list: res.articleData });
            }
        })
    }

    openDiaryHandler = (data) => {
        this.props.history.push({ pathname: 'readdiary', state: { ...data } })
    }


    render() {
        const { list } = this.state;
        return <div>
            <div style={{
                fontSize: 36,
                textAlign: 'center',
                marginTop: 24,
                color: 'rgb(85, 95, 97)'
            }}>____ 日志列表 ____</div>
            {
                list && list.length > 0 ? <div style={{ width: '85%', margin: '0 auto' }} >
                    {
                        list.map((v, k) => {
                            return <div key={k} style={{
                                background: 'rgb(239, 241, 245)',
                                marginTop: 10,
                                borderRadius: 10
                            }}>
                                <div style={{
                                    paddingTop: 14,
                                    fontSize: 16,
                                    textAlign: 'center',
                                    color: 'rgb(62, 63, 64)'
                                }}>【 {v.title} 】</div>
                                <div style={{
                                    height: 40,
                                    color: 'rgb(74, 66, 66)',
                                    overflow: 'hidden',
                                    textAlign: 'center',
                                    padding: 16
                                }}>
                                    {v.content}
                                </div>

                                <div style={{ textAlign: 'right' ,marginTop:10}}>
                                    <div style={{ padding: 10, display: 'inline-block', cursor: 'pointer' }}
                                        onClick={() => { this.openDiaryHandler(v) }}>
                                        更多... </div>
                                    <div style={{ padding: 10, display: 'inline-block', cursor: 'pointer', paddingRight: 23 }}
                                        onClick={() => { console.log(v.id) }}>
                                        删除</div>
                                </div>
                            </div>
                        })
                    }
                </div> : <div style={{ textAlign: 'center' }}>暂无数据</div>
            }
        </div>
    }

}



export default withRouter(DiaryList);