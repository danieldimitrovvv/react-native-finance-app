import * as React from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native'

import { Button, Surface, IconButton } from 'react-native-paper'

import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Card from './UI/Card'

import Dialog from './UI/Dialog'

export default class ScannerQRCode extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      barcodeData: {
        date: null,
        time: null,
        sum: null
      },
      dialog: {
        visible: false,
        message: '',
        title: '',
        onDismiss: this._hideDialog,
        buttons: { ok: { onPress: this._hideDialog, label: 'ok' } }
      }
    }
  }
  _hideDialog = () =>
    this.setState(state => ({ dialog: { ...state.dialog, visible: false } }))

  async componentDidMount () {
    this.getPermissionsAsync()
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  handleBarCodeScanned = ({ type, data }) => {
    if (type === 256) {
      let barcodeData = data.split('*')
      this.setState({
        scanned: true,
        barcodeData: {
          date: barcodeData[2],
          time: barcodeData[3],
          sum: barcodeData[4]
        }
      })
    } else {
      this.setState(state => ({
        scanned: false,
        dialog: {
          ...state.dialog,
          visible: true,
          message: `Bar code with type ${type} and data ${data} has been scanned is not correct!`,
          title: 'ERROR'
        }
      }))
    }
  }

  _add = () => {
    this.props.resultCard?.onPress(
      this.state.barcodeData.date,
      this.state.barcodeData.time,
      this.state.barcodeData.sum
    )
    // this.setState({ scanned: false })
  }

  render () {
    const { hasCameraPermission, scanned } = this.state
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
    return (
      <View style={styles.container}>
        <Dialog {...this.state.dialog} />

        {!scanned && (
          <Surface style={styles.scannerContainer}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />
          </Surface>
        )}
        {scanned && (
          <View style={styles.resultContainer}>
            {this._renderCardResult()}
            <Button
              icon='refresh'
              mode='contained'
              onPress={() => this.setState({ scanned: false })}
            >
              Scan Again
            </Button>
          </View>
        )}
      </View>
    )
  }

  _renderCardResult = () => (
    <Card
      {...this.props.resultCard}
      style={{ container: styles.card }}
      header={{
        title: this.props.resultCard?.title,
        rightContainer: (
          <IconButton icon={this.props.resultCard?.icon} onPress={this._add} />
        )
      }}
      buttons={{
        ok: {
          label: 'Add',
          mode: 'contained',
          icon: this.props.resultCard?.icon,
          onPress: this._add
        }
      }}
    >
      {this._renderCardResultContent()}
    </Card>
  )

  _renderCardResultContent = () => (
    <Surface styles={styles.resultContent}>
      <Text style={styles.cardText}>{this.state.barcodeData.date}</Text>
      <Text style={styles.cardText}>{this.state.barcodeData.time}</Text>
      <Text style={styles.cardText}>{this.state.barcodeData.sum}</Text>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scannerContainer: {
    width: '100%',
    height: '50%'
  },
  resultContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  resultContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  card: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  cardText: {
    textAlign: 'center'
  }
})
