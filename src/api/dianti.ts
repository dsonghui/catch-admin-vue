/**
 * 岗位管理模块
 *
 */

import { axios } from '@/utils/request';
import { ResponseSuccess } from '@/entities/common';

export function getXiaoQubList(parameter){
  return axios({
    url: '/dianti',
    method: 'get',
    params: parameter
  });
}

export function store(parameter){
  return axios({
    url: '/dianti',
    method: 'post',
    data: parameter
  });
}

export function read(id){
  return axios({
    url: '/dianti/' + id,
    method: 'get'
  });
}

export function update(id, parameter): Promise<ResponseSuccess<boolean>>{
  return axios({
    url: '/dianti/' + id,
    method: 'put',
    data: parameter
  }) as any;
}

export function del(id){
  return axios({
    url: '/dianti/' + id,
    method: 'delete'
  });
}

export function getAllDianTi(): Promise<ResponseSuccess<any>>{
  return axios({
    url: '/dianti/all',
    method: 'get'
  }) as any;
}