import cv2
import webbrowser
import beepy

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH,640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT,480)
detector = cv2.QRCodeDetector()
data =""

while True:
    succes,img = cap.read()
    #img = cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)
    #detects the qr code
    data,bbox,nn = detector.detectAndDecode(img)
    if str(data) != "":
        break
    cv2.imshow("QR Code Scanner - ShareNode",img)
    if cv2.waitKey(1) == ord("q"):
        cap.release()
        cv2.destroyAllWindows()
        exit()

cap.release()
cv2.destroyAllWindows()

webbrowser.open(str(data))
beepy.beep(sound="ping")
