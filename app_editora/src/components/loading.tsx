import React from 'react'
import {View, Modal, ActivityIndicator} from 'react-native'

const Loading = ({visible}) => {
    return(
        <Modal transparent visible={visible}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E0e031'}}>
                <ActivityIndicator size="large" color={'white'} animating={true}/>
            </View>
        </Modal>
    )
}

export default Loading;