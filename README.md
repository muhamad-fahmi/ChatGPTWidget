# ChatGPT Web Widget (By Muhamad Fahmi)
This Chat GPT simple implementation to web widget.
you can add this widget to your website by adding this iframe codes to your web page 

```
<iframe id="widget_chat_gpt" src="https://devlab.sanfasteknovatif.com/ChatGPTWidget/public/widget?button_color=%234c0000&theme_color=%23990000" allowfullscreen mozallowfullscreen webkitallowfullscreen frameborder="0" ></iframe>
```

and add this css 

```
iframe#widget_chat_gpt {
    position: fixed;
    z-index: 99999;
    top: 13px;
    left: 0px;
    right: 0;
    bottom: 0px;
    height: 31rem;
    width: 22rem;
    margin-left: auto;
    margin-top: auto;
    border: 0px !important;
}
```

You can change theme and button color by change url parameter ``` button_color= ``` and ``` theme_color= ``` in iframe with hexa code color [Get Hexa Color Code](https://www.color-hex.com/) and encode it with url encoder [Encode Url](https://www.urlencoder.org/)

Example change :

```
https://devlab.sanfasteknovatif.com/ChatGPTWidget/public/widget?button_color=%234c0000&theme_color=%23990000
```

Example view :

![image](https://user-images.githubusercontent.com/60981281/211178367-642e849e-48ec-4729-a0c4-431c37f545e2.png)

