<?php

	//获取登录界面的数据
    $userlgn = @$_REQUEST["userlgn"];
    $passlgn = @$_REQUEST["passlgn"];

	//获取cookie
	$regs = $_COOKIE["reg"];
	// echo $regs;
	// echo "<br>";
	
	//将登录界面和注册界面的数据相比较
	//遍历cookie
	$arr = json_decode($regs,true);
	foreach($arr as $name){
		// echo $name['name'];
		// echo "<br>";
		// echo $name['pass'];
		if($userlgn == $name['name'] && $passlgn == $name['pass']){
			echo "<script language=javascript>alert('welcome');location.href='../index.html';</script>";
			break;
		}
		if($userlgn == $name['name'] && $passlgn != $name['pass']){
			echo "<script language=javascript>alert('error password');window.history.back(-1);</script>";
			break;
		}
		if($userlgn != $name['name']){
			echo "<script language=javascript>alert('no this user please register');location.href='../register.html';</script>";
			break;
		}
	}

?>