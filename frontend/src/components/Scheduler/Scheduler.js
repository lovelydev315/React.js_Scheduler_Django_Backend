import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_limit.js';
const scheduler = window.scheduler;

export default class Scheduler extends Component {

    initSchedulerEvents() {
        if (scheduler._$initialized) {
            return;
        }

        const onDataUpdated = this.props.onDataUpdated;

        scheduler.attachEvent('onEventAdded', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('create', ev, id);
            }
        });

        scheduler.attachEvent('onEventChanged', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('update', ev, id);
            }
        });

        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('delete', ev, id);
            }
        });
        scheduler._$initialized = true;
    }

    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 70;
        var alert_opts = [
            { key: 1, label: 'Break' },
            { key: 2, label: 'Math' },
            { key: 3, label: 'English' }
        ];
         
        scheduler.locale.labels.section_select = 'Alert';
        scheduler.config.first_hour = 0;
        scheduler.config.last_hour = 24;
         
        
        this.initSchedulerEvents();
        
        const { events } = this.props;
        const { holiday } = this.props;
        const { vacancy } = this.props;
        
        console.log(events);
        scheduler.init(this.schedulerContainer, new Date());

        holiday.map((item)=>{
            events.push({start_date:item.start_date, end_date:item.end_date, text:item.text, color:'red'});
            scheduler.addMarkedTimespan({  
                start_date:   new Date(item.start_date),
                end_date: new Date(item.end_date),
                zones: "fullday",
                css:   "holiday_section",
                type:  "dhx_time_block" //the hardcoded value
            });
        })

        vacancy.map((item)=>{
            events.push({start_date:item.start_date, end_date:item.end_date, text:item.text, color:'yellow'});
            scheduler.addMarkedTimespan({  
                start_date:   new Date(item.start_date),
                end_date: new Date(item.end_date),
                zones: "fullday",
                css:   "vacancy_section",
                type:  "dhx_time_block" //the hardcoded value
            });
        })

        scheduler.updateView();

        scheduler.clearAll();
        scheduler.parse(events);
        
    }

    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }

    componentDidUpdate() {
        scheduler.render();
    }

    setHoursScaleFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }

    render() {
        const { timeFormatState } = this.props;
        this.setHoursScaleFormat(timeFormatState);
        return (
            <div
                ref={ (input) => { this.schedulerContainer = input } }
                style={ { width: '100%', height: '100%' } }
            ></div>
        );
    }
}
