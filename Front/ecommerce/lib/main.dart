import 'package:flutter/material.dart';

class ShoppingApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: TextField(
          decoration: InputDecoration(
            hintText: "Pesquisar produtos",
            border: InputBorder.none,
            suffixIcon: Icon(Icons.search)
          ),
        ),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.shopping_cart),
            onPressed: () {
              // Ação para levar ao carrinho de compras
            },
          )
        ],
      ),
      body: Center(
        child: Text("Conteúdo do e-commerce"),
      ),
    );
  }
}
