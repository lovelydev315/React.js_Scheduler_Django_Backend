import React, { Component } from 'react';
import Scheduler from './components/Scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import axios from 'axios';
import './App.css';

class App extends Component {
    state = {
        currentTimeFormatState: true,
        messages: [],
        scheduler_data:[],
        holiday_data:[],
        vacancy_data:[],
        scheduler_flag:false,
        holiday_flag:false,
        vacancy_flag:false
    };

    componentDidMount () {
        let schedule=[];
        let holiday=[];
        let vacancy=[];
        var self = this;
//get event data
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/events'
            
        }).then(function (response) {
            var data = response.data;
            data.map((item,index)=>{
                var buffer={start_date:item.start_date, end_date:item.end_date, text:item.name, id:item.event_id, event_id:item.id}
                schedule.push(buffer);
            })
            self.setState({scheduler_data:schedule});
            self.setState({scheduler_flag:true})
        });
//get holiday data
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/holidays'
            
        }).then(function (response) {
            var data = response.data;
            data.map((item,index)=>{
                var buffer={start_date:item.start_date, end_date:item.end_date, text:item.name, id:item.event_id}
                holiday.push(buffer);
            })
            console.log(holiday);
            self.setState({holiday_data:holiday});
            self.setState({holiday_flag:true})
        });
//get vacancy data
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/vacancys'
            
        }).then(function (response) {
            var data = response.data;
            data.map((item,index)=>{
                var buffer={start_date:item.start_date, end_date:item.end_date, text:item.name, id:item.event_id}
                vacancy.push(buffer);
            })
            console.log(vacancy);
            self.setState({vacancy_data:vacancy});
            self.setState({vacancy_flag:true})
        });

    }

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [
            newMessage,
            ...this.state.messages
        ];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }
//convert date format to comfortable type
    getDateFormat = (origin_date) => {
        var date = new Date(origin_date);
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        var dat = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();

        if (month < 10) month = '0'+ month;
        if (dat < 10) dat = '0' + dat;
        if (hour < 10) hour = '0' + hour;
        if (min < 10) min = '0' + min;
        return year+"-"+month+"-"+dat+" "+hour+":"+min;
    }
//event update, create, delete
    logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? ` (${ev.text})` : '';
        const message = `event ${action}: ${id} ${text}`;

        var form_data = new FormData();
        form_data.append('start_date',  this.getDateFormat(ev.start_date));
        form_data.append('end_date',  this.getDateFormat(ev.end_date));
        form_data.append('name',  ev.text);
        form_data.append('description' , 'fgfd');
        form_data.append('event_id' , id);
        var self = this;

        if (action === "create"){
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/events/',
                data: form_data,
                headers: {'Content-Type': 'multipart/form-data' }
            }).then(function (response) {
                var data = response.data;
                var schedule = self.state.scheduler_data;
                var buffer={start_date:data.start_date, end_date:data.end_date, text:data.name, id:data.event_id, event_id:data.id}
                schedule.push(buffer);
                self.setState({scheduler_data:schedule});
            });
        }else if(action === "update"){
            var schedule_id
            this.state.scheduler_data.map((item)=>{
                if (String.valueOf(item.id) == String.valueOf(id)) {
                    schedule_id = item.event_id;
                }
            })
            form_data.append('start_date',  this.getDateFormat(ev.start_date));
            form_data.append('end_date',  this.getDateFormat(ev.end_date));
            form_data.append('name',  ev.text);
            form_data.append('description' , 'fgfd');
            form_data.append('event_id' , id);
            axios({
                method: 'put',
                url: 'http://127.0.0.1:8000/events/'+schedule_id+'/',
                data: form_data,
                headers: {'Content-Type': 'multipart/form-data' }
            }).then(function (response) {
                
            });
        }else {
            var schedule_id
            this.state.scheduler_data.map((item)=>{
                if (String.valueOf(item.id) == String.valueOf(id)) {
                    schedule_id = item.event_id;
                } 
            });
            axios({
                method: 'delete',
                url: 'http://127.0.0.1:8000/events/'+schedule_id+'/',
                headers: {'Content-Type': 'multipart/form-data' }
            }).then(function (response) {
                
            });
        }
        this.addMessage(message);
    }
//chage time format 12hour/24hour
    handleTimeFormatStateChange = (state) => {
        this.setState({
            currentTimeFormatState: state
        });
    }

    render() {
        const { currentTimeFormatState, messages } = this.state;
        return (
            <div>
                <div className="tool-bar">
                    <Toolbar
                        timeFormatState={currentTimeFormatState}
                        onTimeFormatStateChange={this.handleTimeFormatStateChange}
                    />
                </div>
                <div className='scheduler-container'>
                    {this.state.scheduler_flag === true && this.state.holiday_flag===true && this.state.vacancy_flag===true &&
                    <Scheduler
                        holiday={this.state.holiday_data}
                        vacancy={this.state.vacancy_data}
                        events={this.state.scheduler_data}
                        timeFormatState={currentTimeFormatState}
                        onDataUpdated={this.logDataUpdate}
                    />}
                </div>
            </div>
        );
    }
}
export default App;
