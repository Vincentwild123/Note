
//3d7 动态规划 图像压缩问题
#include "stdafx.h"
#include <iostream> 
using namespace std; 
 
const int N = 7;
 
int length(int i);
void Compress(int n,int p[],int s[],int l[],int b[]);
void Tracebace(int n,int& i,int s[],int l[]);
void Output(int s[],int l[],int b[],int n);
 
int main()
{
	int p[] = {0,10,12,15,255,1,2};//图像灰度数组 下标从1开始计数
	int s[N],l[N],b[N];
 
	cout<<"图像的灰度序列为："<<endl;
 
	for(int i=1;i<N;i++)
	{
		cout<<p[i]<<" ";
	}
	cout<<endl;
 
	Compress(N-1,p,s,l,b);
	Output(s,l,b,N-1);
	return 0;
}
 
void Compress(int n,int p[],int s[],int l[],int b[])
{
	int Lmax = 256,header = 11;
	s[0] = 0;
	for(int i=1; i<=n; i++)
	{
		b[i] = length(p[i]);//计算像素点p需要的存储位数
		int bmax = b[i];
		s[i] = s[i-1] + bmax;
		l[i] = 1;
 
		for(int j=2; j<=i && j<=Lmax;j++)
		{
			if(bmax<b[i-j+1])
			{
				bmax = b[i-j+1];
			}
 
			if(s[i]>s[i-j]+j*bmax)
			{
				s[i] = s[i-j] + j*bmax;
				l[i] = j;
			}
		}
		s[i] += header;
	}
}
 
int length(int i)
{
	int k=1;
	i = i/2;
	while(i>0)
	{
		k++;
		i=i/2;
	}
	return k;
}
 
void Traceback(int n,int& i,int s[],int l[])
{
	if(n==0)
		return;
	Traceback(n-l[n],i,s,l);
	s[i++]=n-l[n];//重新为s[]数组赋值，用来存储分段位置
}
 
void Output(int s[],int l[],int b[],int n)
{
	//在输出s[n]存储位数后，s[]数组则被重新赋值，用来存储分段的位置
	cout<<"图像压缩后的最小空间为："<<s[n]<<endl;
	int m = 0;
	Traceback(n,m,s,l);
	s[m] = n;
	cout<<"将原灰度序列分成"<<m<<"段序列段"<<endl;
	for(int j=1; j<=m; j++)
	{
		l[j] = l[s[j]];
		b[j] = b[s[j]];
	}
	for(int j=1; j<=m; j++)
	{
		cout<<"段长度："<<l[j]<<",所需存储位数:"<<b[j]<<endl;
	}
}