import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { setSelectedValue } from '@redux/message/actions';

const { Option } = Select;

interface IProps {
    searchItems: any;
    selectedValue: any;
    conversation: any;
    setPickListOption: Function;
    setSelectedValue: Function;
  }

class SearchInput extends PureComponent<IProps> {

    state = {
        conversation: this.props.conversation,
    }

    componentDidMount () {
        const { setPickListOption: initPickListOption, setSelectedValue: initSelectedValue, conversation} = this.props;
        initSelectedValue({ selectedValue: conversation.recipientInfo._id, pickListOption: 'individual' });
        initPickListOption('individual');
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { conversation } = nextProps;
        if(conversation !== prevState.conversation){
          return {conversation: nextProps.conversation, selectedValue: nextProps.conversation.recipientInfo._id }
        } 
        return null;
    }

    onChange(value) {
        const { setPickListOption, setSelectedValue } = this.props
        // let lastValue = value[value.length-1];
        let lastValue = value;
        let selectedValue = value;
        let pickListOption = 'individual';
        if (lastValue) {
            if (lastValue === "all") {
                selectedValue = ['all'];
                pickListOption = 'all';
            }
            else if (lastValue === "paid") {
                selectedValue = ['paid'];
                pickListOption= 'paid';
            }
            else if (lastValue === "free") {
                selectedValue = ['free'];
                pickListOption= 'free';
            }
        }
        setPickListOption(pickListOption);
        setSelectedValue({ selectedValue: selectedValue, pickListOption: pickListOption });
    }

    onSearch(val) {
        console.log('search:', val);
    }

    render() {
        const { searchItems, selectedValue } = this.props;

        return (
            <Select
                showSearch
                allowClear
                style={{ width: "300px", marginLeft: "20px" }}
                placeholder="Send to"
                optionFilterProp="children"
                onChange={(value) => this.onChange(value)}
                onSearch={(value) => this.onSearch(value)}
                filterOption={(input, option: any) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectedValue}
                maxTagCount='responsive'
                options={searchItems}
            >
            </Select>
        );
    }
}

const mapStates = (state: any) => {
    return {
        selectedValue: state.conversation.selectedValue,
        searchItems: state.conversation.searchItems,
        conversation: state.conversation.activeConversation,
    };
  }; 
const mapDispatch = { setSelectedValue };
export default connect(mapStates, mapDispatch)(SearchInput);
